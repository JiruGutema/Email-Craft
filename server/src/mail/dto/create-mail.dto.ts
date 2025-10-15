import { ApiProperty } from "@nestjs/swagger";

export class CreateMailDto {
    @ApiProperty({ example: 'user@example.com' })
    to: string[];
    @ApiProperty({ example: 'Welcome to Our Service' })
    subject: string;
    @ApiProperty({ example: 'this is a test email from Mail Craft (try to write your message with styled html and css) ' })
    text?: string;
    @ApiProperty({ example: '<h1>This is a test email from Mail Craft</h1>' })
    body?: string;
}
