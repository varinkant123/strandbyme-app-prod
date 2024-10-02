const DataAccountMainMenu = () => {
  const data = [
    {
      id: "account",
      title: "Account",
      items: [
        {
          id: "account_name",
          title: "Name",
          page: "AccountName",
        },
        {
          id: "account_location",
          title: "Location",
          page: "AccountLocation",
        },
        {
          id: "account_avatar",
          title: "Avatar",
          page: "AccountAvatar",
        },
        {
          id: "account_friends",
          title: "Friends",
          page: "AccountFriends",
        },
      ],
    },
    // {
    //   id: "preferences",
    //   title: "Preferences",
    //   items: [
    //     {
    //       id: "pref_notifications",
    //       title: "Notifications",
    //       page: "PageAccountNotifications",
    //     },
    //     {
    //       id: "pref_privacy",
    //       title: "Privacy",
    //       page: "PageAccountPrivacy",
    //     },
    //   ],
    // },
    {
      id: "help_support",
      title: "Help and Support",
      items: [
        // {
        //   id: "help_invite",
        //   title: "Invite",
        //   page: "PageAccountInvite",
        // },
        // {
        //   id: "help_report_problem",
        //   title: "Report Issue",
        //   page: "AccountReportIssue",
        // },
        {
          id: "help_about",
          title: "About",
          page: "AccountAbout",
        },
      ],
    },
    {
      id: "logout",
      title: "",
      items: [
        {
          id: "account_logout",
          title: "Sign out",
        },
        // {
        //   id: "account_delete",
        //   title: "Delete account",
        // },
      ],
    },
  ];
  return data;
};

export default DataAccountMainMenu;
