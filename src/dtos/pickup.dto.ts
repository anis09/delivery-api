import { IsDefined, IsIn, IsNumber, IsOptional } from "class-validator";

export class CreatePickUpReqDto {
  @IsDefined()
  public pickup_time: Date;

  @IsDefined()
  public pickup_adress: string;

  @IsDefined()
  public pickup_city: string;

  @IsDefined()
  public pickup_state: string;

  @IsDefined()
  @IsNumber()
  public pickup_zipCode: number;

  @IsDefined()
  public pickup_items: string[];

  @IsIn(["PENDING", "IN_PROGRESS", "COMPLETED"])
  public pickup_status: string;
}
export class CreatePickUpResDto {
    public success: boolean;
    public createdPickUpId: string;
  }
  export class UpdatePickupReqDto {

    @IsOptional()
    public  pickup_time: Date;

    @IsOptional()
    public pickup_adress: string;

    @IsOptional()
    public pickup_city: string;

    @IsOptional()
    public pickup_state: string;

    @IsOptional()
    @IsNumber()
    public pickup_zipCode: number;

    @IsOptional()
    public pickup_items: string[];
  }
export class UpdatePickupResDto{
  public success:boolean;
}
export class DeletePickupResDto {
  public success:boolean;
}