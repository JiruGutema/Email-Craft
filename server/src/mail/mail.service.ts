import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateMailDto } from './dto/create-mail.dto';
import { UpdateMailDto } from './dto/update-mail.dto';
import { google } from 'googleapis';
import { PrismaClient } from '@prisma/client';
import { Logger } from 'src/utils/utils';

const prisma = new PrismaClient();

@Injectable()
export class MailService {
  async sendEmail(
    userId: string,
    body: CreateMailDto
  ) {
    // Get tokens from DB
    const user = await prisma.users.findUnique({
      where: { id: userId },
      select: { googleAccessToken: true, googleRefreshToken: true },
    }); 

    if (!user?.googleAccessToken) {
      throw new UnauthorizedException('Google access token not found. Please log in with Google.');
    }

    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({
      access_token: user.googleAccessToken,
      refresh_token: user.googleRefreshToken || undefined,
    });

    const gmail = google.gmail({ version: 'v1', auth: oauth2Client });

    // Build the message with support for both text and html. Send a request with either a text or html field in the body.
    // If html is provided, the email will be sent as HTML.
    let message = [
      `To: ${body.to}`,
      `Subject: ${body.subject}`,
      'MIME-Version: 1.0',
      body.body
        ? 'Content-Type: text/html; charset=utf-8'
        : 'Content-Type: text/plain; charset=utf-8',
      '',
      body.body ? body.body : body.text || '',
    ].join('\n');

    const encodedMessage = Buffer.from(message)
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

    try {
      await gmail.users.messages.send({
        userId: 'me',
        requestBody: { raw: encodedMessage },
      });
      return { message: 'Email sent successfully!' };
    } catch (error) {
      // Only try to refresh if access token expired and refresh token exists
      if (
        (error.response?.data?.error === 'invalid_grant' || error.code === 401) &&
        user.googleRefreshToken
      ) {
        // Refresh the access token
        await oauth2Client.refreshAccessToken();
        const newTokens = oauth2Client.credentials;

        // Update DB with new access token
        await prisma.users.update({
          where: { id: userId },
          data: { googleAccessToken: newTokens.access_token },
        });

        // Retry sending email with new token
        oauth2Client.setCredentials({
          access_token: newTokens.access_token,
          refresh_token: user.googleRefreshToken,
        });

        await gmail.users.messages.send({
          userId: 'me',
          requestBody: { raw: encodedMessage },
        });

        return { message: 'Email sent successfully after refreshing token!' };
      }
      // If no refresh token, prompt re-login
      if (!user.googleRefreshToken) {
        throw new UnauthorizedException('Google refresh token missing. Please log in with Google again.');
      }
      throw error;
    }
  }

  findAll() {
    return `This action returns all mail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} mail`;
  }

  update(id: number, updateMailDto: UpdateMailDto) {
    return `This action updates a #${id} mail`;
  }

  remove(id: number) {
    return `This action removes a #${id} mail`;
  }
}

