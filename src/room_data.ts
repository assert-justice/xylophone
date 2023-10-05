

export interface RoomDate{
    id: number;
    childId: number;
    childCellX: number;
    childCellY: number;
    parents: [number,string][]; // id, coord
}