import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationException extends HttpException {
    constructor(objectOrError?: string | object | any) {
        const { message, ...response } = objectOrError?.response;

        super(
            {
                ...response,
                validation: message
                    ?.map((validation) => ({
                        [validation?.property]: validation,
                    }))
                    .reduce((prev, curr) => {
                        let messages = [];
                        const objectMounted = {};
                        for (const param in curr) {
                            messages = [...messages, ...Object.values(curr[param].constraints)];
                            objectMounted[param] = {
                                messages,
                                receivedValue: curr[param]?.target?.[param] ?? {},
                                decorators: Object.keys(curr[param].constraints),
                            };
                        }

                        return { ...prev, ...objectMounted };
                    }, {}),
            },
            HttpStatus.BAD_REQUEST,
        );
    }
}
