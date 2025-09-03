import { ApiProperty } from "@nestjs/swagger";

export class CreateAuthDto {
    @ApiProperty({example: 'john_doe'})
    username: string;

    @ApiProperty({example: 'securePassword123'})
    password: string;
}

export class SignupUserDto {
    @ApiProperty({example: 'john_doe'})
    username: string;

    @ApiProperty({example: 'John Doe'})
    name: string;

    @ApiProperty({example: 'securePassword123'})
    password: string;

    @ApiProperty({example: 'john@example.com'})
    email: string;

    @ApiProperty({example: 'https://example.com/profile.jpg'})
    picture: string;
}



export class MeDto {
    @ApiProperty({example: '1'})
    id: string;

    @ApiProperty({example: 'jiregna'})
    username: string;

    @ApiProperty({example: 'jiregna'})
    name: string | null;

    @ApiProperty({example: 'jiregna@gmail.com'})
    email: string;

    @ApiProperty({example: ''})
    picture: string;
}