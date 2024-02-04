export interface IConversationLastMsgResDto {
  snippet: string;
  sentAt: string;
  sentByProfileId: string;
}

export enum EMessagePayloadType {
  TEXT = 'text',
  IMAGE = 'image',
}

export interface IMessagePayloadResDto {
  type: EMessagePayloadType;
  text?: string;
  mediaUrl?: string;
}
export interface IMessageResDto {
  id: string;
  createdAt: string;
  updatedAt: string;
  payload: IMessagePayloadResDto;
  senderId: string;
  recipientId: string;
  conversationId: string;
  sentAt: string;
}

export interface IParticipantResDto {
  profileId: string;
  unreadMsgCnt: number;
  displayName?: string;
  logoUrl?: string;
}
export interface IConversationResDto {
  id: string;
  createdAt: string;
  updatedAt: string;
  lastMsg: IConversationLastMsgResDto;
  participants: IParticipantResDto[];
  msgCount: number;
  messages: IMessageResDto[];
}

export interface IFilterConversationStatRes {
  totalConversationCnt: number;
  unreadConversationCnt: number;
}

export interface IRequestHunterFilterConversationsQueryParams {
  page?: number;
  pageSize?: number;
  includeProfileData?: boolean;
  prefetchMessage?: boolean;
  isBackgroundAction?: boolean;
}

export interface IRequestHunterReadConversationMessagesQueryParams {
  markAllAsRead?: boolean;
  page?: number;
  pageSize?: number;
  isBackgroundAction?: boolean;
}

export interface IMessagePayloadDto {
  type: EMessagePayloadType;
  text?: string;
  mediaUrl?: string;
}

export interface ISendMessageInputDto {
  payload: IMessagePayloadDto;
  recipientId: string;
  conversationId: string;
  createdAt: string;
}

export interface IMessageFirebaseSender {
  displayName: string;
  logoUrl: string;
}
export interface IMessageFirebase {
  conversationId: string;
  id: string;
  payload: IMessagePayloadDto;
  recipientId: string;
  sender: IMessageFirebaseSender;
  senderId: string;
  sentAt: string;
  chatServiceId: string;
}

export interface IReduxUpdateConversation {
  conversationId: string;
  markConversationAsRead?: {
    profileId: string;
  };
  updateConversationSnippet?: {
    snippet: string;
    sentAt: string;
    sentByProfileId: string;
  };
}
