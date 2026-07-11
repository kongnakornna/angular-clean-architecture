import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IAlarmRepository } from '../../domain/repositories/alarm.repository';
import { AlarmValidationRequest, AlarmValidationResponse } from '../../domain/entities/alarm.entity';
import { AlarmApiDataSource } from '../datasources/alarm.api.datasource';
import { AlarmValidationRequestDto, AlarmValidationResponseDto } from '../dtos/alarm.dto';

@Injectable({ providedIn: 'root' })
export class AlarmRepositoryImpl implements IAlarmRepository {
  constructor(private ds: AlarmApiDataSource) {}

  validate(request: AlarmValidationRequest): Observable<AlarmValidationResponse> {
    return this.ds.validate(this.toDto(request)).pipe(map((dto) => this.toEntity(dto)));
  }

  validateEn(request: AlarmValidationRequest): Observable<AlarmValidationResponse> {
    return this.ds.validateEn(this.toDto(request)).pipe(map((dto) => this.toEntity(dto)));
  }

  validateTh(request: AlarmValidationRequest): Observable<AlarmValidationResponse> {
    return this.ds.validateTh(this.toDto(request)).pipe(map((dto) => this.toEntity(dto)));
  }

  private toDto(entity: AlarmValidationRequest): AlarmValidationRequestDto {
    return entity;
  }

  private toEntity(dto: AlarmValidationResponseDto): AlarmValidationResponse {
    return dto;
  }
}
