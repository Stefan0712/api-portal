export interface Exercise {
    _id?: string;
    sourceId?: string;
    createdAt: string; 
    updatedAt?: string | null;
    authorId: string;
    source: string;
    isCompleted: boolean;
    name: string;
    description: string;
    reference: string;
    difficulty: string;
    sets: number;
    duration: number;
    durationUnit: string;
    rest: number;
    restUnit: string;
    visibility: string;
    fields: Field[];
    notes: string;
    equipment: Equipment[];
    muscleGroups: TargetGroups[];
    tags: Tag[];
    instructions: string[];
}
export interface TargetGroups {
    id: string;
    name: string;
    author: string;
}
  
export interface Equipment {
    id: string;
    name: string;
    attributes?: EquipmentAttributes[];
}
  
export interface EquipmentAttributes {
    name: string;
    value?: number;
    unit?: string;
}
  
  
export interface Tag {
    id: string;
    name: string;
    color: string;
    author: string;
}
export interface Field {
    name: string,
    unit: string,
    value: number,
    target?: number,
    description?: string,
    isCompleted: boolean
}
export interface Workout {
    _id?: string;
    name: string;
    description: string;
    difficulty: string;
    targetGroups: TargetGroups[];
    duration: number; 
    durationUnit: string;
    equipment: Equipment[];
    exercises: Exercise[] | string[];
    createdAt: string; 
    updatedAt?: string; 
    authorId: string;
    source: string;
    imageUrl?: string; 
    isCompleted: boolean;
    visibility: string;
    tags: Tag[];
    reference: string; 
  }