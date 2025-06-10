import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';


@Injectable()
export class AuthService {
    constructor(private readonly userService: UsersService) {}
    async validateUser(email: string, senha: string){
        const user = await this.userService.findByEmail(email);
        
        if (user) {
            const senhaValida = await bcrypt.compare(senha, user.senha)
            if (senhaValida){
            return {
                ...user,
                senha: undefined,
            }
        };
        }
        throw new Error('email ou senha inválida')
    }
}
