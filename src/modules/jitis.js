/**
 * Default options for Jitsi Meet API
 * @param {number} chatid ChatID of current meeting used in meeting title
 * @param {string} email Email of current participant
 * @returns
 */
const getOptions = (chatid, email) => {
  let options = {
    roomName: `Team-Meet-Video-Call-${chatid}`,
    parentNode: document.querySelector("#video-call"),
    userInfo: {
      displayName: email,
    },
    configOverwrite: {
      doNotStoreRoom: true,
      startWithVideoMuted: true,
      startWithAudioMuted: true,
      enableWelcomePage: false,
      apiLogLevels: [],
      prejoinPageEnabled: false,
      disableRemoteMute: false,
      remoteVideoMenu: {
        disableKick: true,
      },
      hideParticipantsStats: false,
      disableShowMoreStats: true,
      enableSaveLogs: false,
      disableLocalVideoFlip: true,
      enableDisplayNameInStats: false,
    },
    interfaceConfigOverwrite: {
      APP_NAME: "Team Meet",
      TOOLBAR_BUTTONS: [],
      DEFAULT_BACKGROUND: "#c3c3c7",
    },
  };
  return options;
};

export { getOptions };
