import { ApiProperty } from "@nestjs/swagger";

export class CreateSubscriptionDto {
    @ApiProperty({ example: 'user@example.com' })
    email: string;
}
