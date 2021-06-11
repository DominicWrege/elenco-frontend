export enum PlayerStatus {
    Init = "Init",
    Playing = "Playing",
    Pause = "Pause"
}


export enum PlayerAction {
    Play = "Play",
    Pause = "Pause"
}

export interface Store {
    getState: object,
    subscribe: (any) => Promise<any>,
    dispatch: (type: any, payload?) => void
}

export type StoreType = Store | null;
