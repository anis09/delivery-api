import { IsDefined, IsIn, IsNumber, IsOptional } from "class-validator";

export class CreateDeliveryReqDto {
  @IsDefined()
  public delivery_time: Date;

  @IsDefined()
  public delivery_adress: string;

  @IsDefined()
  public delivery_city: string;

  @IsDefined()
  public delivery_state: string;

  @IsDefined()
  @IsNumber()
  public delivery_zipCode: number;

  @IsDefined()
  public delivery_items: string[];

  @IsIn(["PENDING", "IN_PROGRESS", "COMPLETED"])
  public delivery_status: string;
}
export class CreateDeliveryResDto {
    public success: boolean;
    public createddeliveryId: string;
  }
  export class UpdateDeliveryReqDto {

    @IsOptional()
    public  delivery_time: Date;

    @IsOptional()
    public delivery_adress: string;

    @IsOptional()
    public delivery_city: string;

    @IsOptional()
    public delivery_state: string;

    @IsOptional()
    @IsNumber()
    public delivery_zipCode: number;

    @IsOptional()
    public delivery_items: string[];
  }
export class UpdateDeliveryResDto{
  public success:boolean;
}
export class DeleteDeliveryResDto {
  public success:boolean;
}