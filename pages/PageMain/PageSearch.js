import { useState, useEffect, useCallback } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
} from "react-native";
import debounce from "lodash/debounce";
import theme from "../../data/theme.json";
import Header from "../../components/Header/Header";
import SearchInput from "../../components/Search/SearchInput";
import SearchUserItem from "../../components/Search/SearchUserItem";
import ModalAlertGeneric from "../../components/Modal/ModalAlertGeneric";
import api from "../../api/api";
import { useAuthUser } from "../../components/Auth/AuthUserContext";
import LoadingIndicator from "../../components/UI/LoadingIndicator";

// -----------------------------------------------------------------------------------------------------------------------
const PageSearch = () => {
  const [searchValue, setSearchValue] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [modalInfo, setModalInfo] = useState({
    title: "",
    description: "",
    isVisible: false,
  });
  const [requestUID, setRequestUID] = useState(null);
  const { uid } = useAuthUser();

  // --------------------------------------------------------------
  // use effect for modal if requestUID is set then show modal
  const checkFriendStatus = async (friendUID) => {
    try {
      const response = await api.get(`/friend/${uid}/request?UIDF=${friendUID}`);
      const friendData = response.data[0];

      // add exception when user is yourself
      if (friendUID === uid) {
        return {
          title: "Not Available",
          description: "You cannot add yourself as a friend.",
        };
      }

      if (!friendData) {
        await api.post(`/friend/${uid}/request`, { UIDF: friendUID });
        return { title: "Request Sent", description: "Friend request has been sent." };
      }

      const statusMessages = {
        Waiting: {
          title: "Waiting",
          description: "Friend request has been sent. Waiting for response.",
        },
        Pending: {
          title: "Pending",
          description:
            "This user wants to add you as a friend. Would you like to accept?",
        },
        Confirmed: {
          title: "Already Friends",
          description: "You are already friends with this user.",
        },
      };

      return (
        statusMessages[friendData.Status] || {
          title: "Error",
          description: "Unknown friend status.",
        }
      );
    } catch (error) {
      console.error("Error checking friend status:", error);
      return {
        title: "Error",
        description: "Failed to check friend status. Please try again.",
      };
    } finally {
    }
  };

  useEffect(() => {
    if (requestUID) {
      checkFriendStatus(requestUID).then(({ title, description }) => {
        setModalInfo({ title, description, isVisible: true });
      });
      // reset requestUID
      setRequestUID(null);
    }
  }, [requestUID]);

  const handlePress = (item) => {
    setRequestUID(item.uid);
  };

  // --------------------------------------------------------------
  // use effect for search
  const searchUsers = useCallback(
    debounce(async (query) => {
      // check if it not null and then only execute
      if (!query) {
        setSearchResults([]);
        return;
      }

      // trim query
      query = query.trim();

      if (query.length > 3) {
        try {
          const response = await api.get(`/user/search?query=${query}`);
          setSearchResults(response.data);
        } catch (error) {
          console.error("Error searching users:", error);
          setSearchResults([]);
        }
      } else {
        setSearchResults([]);
      }
    }, 300),
    []
  );

  useEffect(() => {
    searchUsers(searchValue);
  }, [searchValue, searchUsers]);

  // --------------------------------------------------------------
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.containerMain}>
        <ModalAlertGeneric
          isVisible={modalInfo.isVisible}
          setVisible={(isVisible) => setModalInfo((prev) => ({ ...prev, isVisible }))}
          title={modalInfo.title}
          description={modalInfo.description}
          onClose={() => setModalInfo({ title: "", description: "", isVisible: false })}
        />
        <Header title="Search" />
        <SearchInput searchValue={searchValue} setSearchValue={setSearchValue} />
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.UID.toString()}
          renderItem={({ item }) => <SearchUserItem item={item} onPress={handlePress} />}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContentContainer}
        />
        {/* if search results are empty and query is not empty then return text */}
        {searchResults.length === 0 && searchValue && (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No results found.</Text>
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
};

// -----------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerMain: {
    flex: 1,
    paddingHorizontal: theme.main.paddingHorizontal,
    backgroundColor: theme.colors.background,
  },
  listContentContainer: {
    paddingBottom: 20, // Add some padding at the bottom of the list
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: theme.main.paddingHorizontal,
  },
  emptyText: {
    fontSize: theme.fontSizes.md,
    color: theme.colors.text,
    opacity: 0.5,
    textAlign: "center",
  },
});

// -----------------------------------------------------------------------------------------------------------------------
export default PageSearch;
