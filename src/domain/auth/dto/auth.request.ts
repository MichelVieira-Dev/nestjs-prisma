import { IsEmail, IsNotEmpty } from 'class-validator';
import { validationTranslations } from 'src/config/translations/validation.translations';

export class AuthRequest {
    @IsEmail({ allow_display_name: true }, { message: validationTranslations.isEmail })
    @IsNotEmpty({ message: validationTranslations.isNotEmpty })
    email: string;

    @IsNotEmpty({ message: validationTranslations.isNotEmpty })
    password: string;
}
