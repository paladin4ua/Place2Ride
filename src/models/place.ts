
import {IsString, IsNumber, IsInt} from "class-validator";


export class Place {
  @IsString()
  name : string;

  @IsString()
  description : string;

  gallery : string[];

  @IsString()
  address : string;

  @IsNumber()
  latitude : number;

  @IsNumber()
  longitude : number;

  @IsInt()
  openTime : number;

  @IsInt()
  closeTime : number;

}
