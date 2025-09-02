export class CreateMailDto {
    to: string;
    subject: string;
    text?: string;
    html?: string;
}
