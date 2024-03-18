import { IMessageResDto } from 'App/types/chat';
import { IAppState, IReduxRootState } from 'App/types/redux';
import { IUser } from 'App/types/user';

export const reduxSelector = {
  getUser: (state: IReduxRootState): IUser => state.user,
  getApp: (state: IReduxRootState): IAppState => state.app,
  getAppLanguage: (state: IReduxRootState) => state.app.language,
  getAppRegisterData: (state: IReduxRootState) => state.app.registerData,
  getAppError: (state: IReduxRootState) => state.app.error,
  getAppRecoveryCode: (state: IReduxRootState) => state.app.recoveryCode,
  getAppMapType: (state: IReduxRootState) => state.app.mapType,
  getAppPublicCategories: (state: IReduxRootState) => state.app.publicCategories,
  getAppPublicTerries: (state: IReduxRootState) => state.app.publicTerries,
  getAppPublicTerryFilter: (state: IReduxRootState) => state.app.publicTerryFilter,
  getUserLanguageCode: (state: IReduxRootState) => state.user.languageCode,
  getAppPublicTerry: (state: IReduxRootState) => state.app.publicTerry,
  getAppTerryCheckins: (state: IReduxRootState) => state.app.terryCheckins,
  getAppTerryCheckinInput: (state: IReduxRootState) => state.app.terryCheckinInput,
  getAppTerryCheckinInputRate: (state: IReduxRootState) => state.app.terryCheckinInput?.rate,
  getAppCoordinatesPath: (state: IReduxRootState) => state.app.coordinatesPath,
  getAppCoordinatesPathByTerryId: (state: IReduxRootState, terryId: string) =>
    state.app.coordinatesPath && state.app.coordinatesPath[terryId],
  getAppOtherUserProfileToDisplay: (state: IReduxRootState) => state.app.otherUserProfileToDisplay,
  getNearbyPlayers: (state: IReduxRootState) => state.app.nearbyPlayers,
  getTerryVerifyCodes: (state: IReduxRootState) => state.app.terryVerifyCodes,
  getLoadingStates: (state: IReduxRootState) => state.app.loadingStates,
  getConversationStat: (state: IReduxRootState) => state.app.conversationStat,
  getConversations: (state: IReduxRootState) => state.app.conversations,
  getSelectedConversationId: (state: IReduxRootState) => state.app.selectedConversationId,
  getMessages: (state: IReduxRootState) => state.app.messages,
  // Usage example: const messages = useSelector(reduxSelector.getMessagesFromConversationId(conversationId));
  getMessagesFromConversationId: (conversationId: string) => (state: IReduxRootState) =>
    state.app?.messages?.[conversationId] as Record<string, IMessageResDto>,
  getNearbyPlayerLocation: (state: IReduxRootState) => state.app.nearbyPlayerLocation,
};
