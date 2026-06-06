import { Controller, Inject } from "@nestjs/common";
import { HospedeAddInputDto } from "src/core/dto/HospedeAddInputDto";
import { HospedeOutputDto } from "src/core/dto/HospedeOutputDto";
import { HospedeSearchParameters } from "src/core/dto/HospedeSearchParameters";
import { HospedeUpdateInputDto } from "src/core/dto/HospedeUpdateInputDto";
import { AbstractFacade } from "src/core/impl/facades/AbstractFacade";
import { HOSPEDES_FACADE } from "src/modules/HospedesTokens";
import { AbstractController } from "./AbstractController";

@Controller("api/hospedes")
export class HospedesController extends AbstractController<
    HospedeAddInputDto,
    HospedeUpdateInputDto,
    HospedeOutputDto,
    HospedeSearchParameters
> {
    public constructor(
        @Inject(HOSPEDES_FACADE)
        facade: AbstractFacade<HospedeAddInputDto, HospedeUpdateInputDto, HospedeOutputDto, HospedeSearchParameters>,
    ) {
        super(facade);
    }
}
