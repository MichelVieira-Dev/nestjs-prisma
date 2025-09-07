import { Expose } from 'class-transformer';
import { IsNotEmpty, MinLength } from 'class-validator';
import { validationTranslations } from 'src/config/translations/validation.translations';

export class UserPostRequest {
    @IsNotEmpty({ message: validationTranslations.isNotEmpty })
    @MinLength(1, { message: validationTranslations.minLength })
    @Expose()
    title: string;

    @MinLength(1, { message: validationTranslations.minLength })
    @Expose()
    description?: string;
}
