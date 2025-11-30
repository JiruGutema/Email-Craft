import {
	ForbiddenException,
	Injectable,
	NotFoundException,
	UnauthorizedException,
	InternalServerErrorException,
} from '@nestjs/common';
import { CreateAuthDto, SignupUserDto } from './dto/auth.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
	) { }

	async validateUser(username: string, password: string) {
		const user = await this.usersService.findOneByUsername(username);
		if (user && (await bcrypt.compare(password, user.password))) {
			return user;
		}
		return null;
	}

	async login(createAuthDto: CreateAuthDto) {
		const { username, password } = createAuthDto;
		const user = await this.validateUser(username, password);

		if (!user) {
			throw new UnauthorizedException('Invalid username or password');
		}

		const payload = { username: user.username, sub: user.id };
		const token = await this.jwtService.signAsync(payload);

		return {
			message: 'Logged in successfully',
			accessToken: token,
			user: {
				id: user.id,
				username: user.username,
				email: user.email,
				name: user.name,
				picture: user.picture,
			},
		};
	}

	async me(username: string) {
		const user = await this.usersService.findOneByUsername(username);
		if (!user) {
			throw new NotFoundException('User not found');
		}
		return {
			id: user.id,
			username: user.username,
			email: user.email,
			name: user.name,
			picture: user.picture,
		};
	}

	async signup(signupUserDto: SignupUserDto) {
		try {
			const user = await this.usersService.create(signupUserDto);
			if (!user) {
				throw new InternalServerErrorException('Failed to create user');
			}
			return {
				message: 'User created successfully',
				user: {
					id: user.id,
					username: user.username,
					email: user.email,
					name: user.name,
					picture: user.picture,
				},
			};
		} catch (error: any) {
			if (error.code === 'P2002') {
				throw new ForbiddenException('User with this email or username already exists');
			}
			throw new InternalServerErrorException('Failed to create user');
		}
	}

	async delete(userId: string) {
		const deletedUser = await this.usersService.delete(userId);
		if (!deletedUser) {
			throw new NotFoundException('User not found');
		}
		return { message: 'User deleted successfully' };
	}

	async logout(userId: string) {
		const res = await this.usersService.logout(userId);
		if (!res) {
			throw new NotFoundException('User not found');
		}
		return { message: 'Logged out successfully' };
	}

	async refreshToken(userId: string, username: string) {
		const user = await this.usersService.findOneById(userId);
		if (!user || user.username !== username) {
			throw new ForbiddenException('Invalid user');
		}
		const payload = { username: user.username, sub: user.id };
		const token = await this.jwtService.signAsync(payload);
		return { accessToken: token };
	}
}
