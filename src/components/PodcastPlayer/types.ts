export enum PlayerStatus {
    Init = "Init",
    Playing = "Playing",
    Pause = "Pause"
}


export enum PlayerAction {
    Play = "Play",
    Pause = "Pause"
}


export interface StoreState {
    lastAction: LastAction
}

export interface LastAction {
    type: string
}

export interface Store {
    getState: () => StoreState,
    subscribe: (any) => Promise<any>,
    dispatch: (type: any, payload?) => void
}

export type StoreType = Store | null;
