export interface Duck {
    name: string;
    numLegs: number;
    makesound: (sound : string) => void;
}
const Duck1:Duck = {

    name:'lolo',
    numLegs: 2,
    makesound: (sound: any ) => console.log (sound) /** console.log prints (sound data) into console of browser */
}
const Duck2:Duck = {

    name:'nono',
    numLegs: 2,
    makesound: (sound: any ) => console.log (sound)
}
Duck1.makesound('koko');
export const ducks=[Duck1,Duck2]