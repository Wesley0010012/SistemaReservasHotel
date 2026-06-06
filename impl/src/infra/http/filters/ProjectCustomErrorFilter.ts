import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { CustomError } from "project-custom-errors";
import { Response } from "express";

@Catch(CustomError)
export class ProjectCustomErrorFilter implements ExceptionFilter<CustomError> {
    public catch(exception: CustomError, host: ArgumentsHost): void {
        const response = host.switchToHttp().getResponse<Response>();
        const status = exception.status();

        response.status(this.toHttpStatus(status)).json({
            mensagem: exception.message,
            status,
        });
    }

    private toHttpStatus(status: number | null): number {
        switch (status) {
            case 1:
            case 5:
            case 6:
                return 400;
            case 2:
                return 404;
            case 4:
                return 401;
            case 3:
                return 422;
            case 0:
            default:
                return 500;
        }
    }
}
