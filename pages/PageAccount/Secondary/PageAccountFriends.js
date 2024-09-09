import { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Keyboard,
  FlatList,
  Text,
} from "react-native";
import theme from "../../../data/theme.json";
import { useAuthUser } from "../../../components/Auth/AuthUserContext";
import api from "../../../api/api";
import ModalGeneric from "../../../components/Modal/ModalGeneric";
import AccountFriendsUserItem from "../../../components/Account/AccountFriends/AccountFriendsUserItem";
import _ from "lodash";

// -----------------------------------------------------------------------------------------------------------------------
const PageAccountFriends = ({}) => {
  const [friends, setFriends] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [modalInfo, setModalInfo] = useState({
    isVisible: false,
  });
  const { uid } = useAuthUser();

  // -----------------------------------------------------------------------------------------------------------------
  // get user data which will then be prop drilled down to the component and screen within the stack
  useEffect(() => {
    const getUserData = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/friend/${uid}/list`);
        setFriends(response.data);
      } catch (error) {
        console.error("Error fetching users friends data:", error);
      } finally {
        setLoading(false);
      }
    };
    getUserData();
  }, []); // Remove friends from the dependency array

  // loading screen
  if (isLoading) {
    return (
      <View style={styles.containerMain}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  // -----------------------------------------------------------------------------------------------------------------
  // handler on press
  const handlePressDelete = async (item) => {
    setLoading(true);
    try {
      await api.delete(`/friend/${uid}/request?UIDF=${item.UIDF}`);
      setFriends((prevFriends) =>
        prevFriends.filter((friend) => friend.UIDF !== item.UIDF)
      );
    } catch (error) {
      console.error("Error removing friend:", error);
    } finally {
      setLoading(false);
      setModalInfo((prev) => ({ ...prev, isVisible: false }));
    }
  };

  const handlePressAccept = async (item) => {
    setLoading(true);
    try {
      await api.put(`/friend/${uid}/request?UIDF=${item.UIDF}`);
      // change the status of the friend to confirmed
      setFriends((prevFriends) =>
        prevFriends.map((friend) => {
          if (friend.UIDF === item.UIDF) {
            return { ...friend, Status: "Confirmed" };
          }
          return friend;
        })
      );
    } catch (error) {
      console.error("Error Adding friend:", error);
    } finally {
      setLoading(false);
      setModalInfo((prev) => ({ ...prev, isVisible: false }));
    }
  };

  const handlePressSelectToRemove = (item) => {
    const friendItem = friends.find((friend) => friend.UIDF === item.UIDF);
    setModalInfo({
      title: "Remove Friend",
      description: `Would you like to remove ${friendItem.UserFirstName} ${friendItem.UserLastName} from your friends list?`,
      isVisible: true,
      selectedFriend: friendItem,
    });
  };

  // -----------------------------------------------------------------------------------------------------------------
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.containerMain}>
        <ModalGeneric
          isVisible={modalInfo.isVisible}
          setVisible={(isVisible) => setModalInfo((prev) => ({ ...prev, isVisible }))}
          title={modalInfo.title}
          description={modalInfo.description}
          labelYes={"Remove"}
          labelNo={"Cancel"}
          onYes={() => {
            handlePressDelete(modalInfo.selectedFriend);
          }}
          onNo={() => {
            setModalInfo((prev) => ({ ...prev, isVisible: false }));
          }}
        />
        <FlatList
          data={friends}
          keyExtractor={(item) => item.UIDF.toString()}
          renderItem={({ item, index }) => (
            <AccountFriendsUserItem
              item={item}
              index={index}
              handlePressRemove={handlePressSelectToRemove}
              handlePressAccept={handlePressAccept}
            />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContentContainer}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

// -----------------------------------------------------------------------------------------------------------------------
const styles = StyleSheet.create({
  containerMain: {
    ...theme.class.PageSecondaryContainer,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  listContentContainer: {
    paddingBottom: 20, // Add some padding at the bottom of the list
  },
});

// -----------------------------------------------------------------------------------------------------------------------
export default PageAccountFriends;
