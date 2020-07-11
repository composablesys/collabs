// The network interface designed for a two-way interactive 
// communication session between user and server using WebSocket API

// /**
//  * Interface describing the send and receive messages 
//  * with WebSocket
//  */
// export interface Network {
//     /**
//      * 
//      * @param data The data that travel through the network
//      */
//     send(data: ArrayBufferView | ArrayBuffer | Buffer | IStringified): void;
//     /**
//      * @param message The message received from the server
//      */
//     onmessage: (message: IMessageEvent) => void;
// }