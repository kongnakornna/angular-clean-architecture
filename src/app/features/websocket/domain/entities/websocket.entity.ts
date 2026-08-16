export interface WsSubscribeMessage { type: 'subscribe'; topic: string; }
export interface WsUnsubscribeMessage { type: 'unsubscribe'; topic: string; }
export interface WsChatMessage { type: 'message'; payload: { text: string }; room: string; }
export type WsClientMessage = WsSubscribeMessage | WsUnsubscribeMessage | WsChatMessage;

export interface WsDataMessage { type: 'message'; topic: string; payload: any; timestamp: string; }
export interface WsNotification { type: 'notification'; title: string; body: string; timestamp: string; }
export interface WsErrorMessage { type: 'error'; message: string; }
export type WsServerMessage = WsDataMessage | WsNotification | WsErrorMessage;
