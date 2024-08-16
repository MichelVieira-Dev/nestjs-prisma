import { Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { validationTranslations } from 'src/config/translations/validation.translations';

export class UserRequest {
    @IsEmail({ allow_display_name: true }, { message: validationTranslations.isEmail })
    @IsNotEmpty({ message: validationTranslations.isNotEmpty })
    @Expose()
    email: string;

    @MinLength(10, { message: validationTranslations.minLength })
    @Expose()
    name?: string;

    @IsNotEmpty({ message: validationTranslations.isNotEmpty })
    @Expose()
    password?: string;
}
