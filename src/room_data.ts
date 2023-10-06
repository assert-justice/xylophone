

export interface RoomDate{
    id: number;
    childId: number;
    childCellX: number;
    childCellY: number;
    parentPads: [number,string][]; // id, coord
    walls: string[]; // coords
}