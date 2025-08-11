import { Injectable, HttpException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { HttpMethod } from './http-method.type';
import { HttpResponse } from './http-response.interface';

@Injectable()
export class HttpHandlerService {
  private readonly defaultHeaders: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  constructor(private readonly httpService: HttpService) {}

  async request<TResponse, TBody = unknown>(
    method: HttpMethod,
    url: string,
    options?: {
      query?: Record<string, unknown>;
      body?: TBody;
      headers?: Record<string, string>;
    },
  ): Promise<HttpResponse<TResponse>> {
    const config: AxiosRequestConfig = {
      method,
      url,
      params: options?.query,
      data: options?.body,
      headers: {
        ...this.defaultHeaders,
        ...(options?.headers || {}),
      },
    };

    try {
      const response: AxiosResponse<TResponse> = await firstValueFrom(
        this.httpService.request<TResponse>(config),
      );
      return { data: response.data, status: response.status };
    } catch (error) {
      const status = error.response?.status || 500;
      const data = error.response?.data || { message: error.message };
      throw new HttpException({ data, status }, status);
    }
  }

  async get<TResponse>(
    url: string,
    query?: Record<string, unknown>,
    headers?: Record<string, string>,
  ): Promise<HttpResponse<TResponse>> {
    return this.request<TResponse>('get', url, { query, headers });
  }

  async post<TResponse, TBody = unknown>(
    url: string,
    body?: TBody,
    headers?: Record<string, string>,
  ): Promise<HttpResponse<TResponse>> {
    return this.request<TResponse, TBody>('post', url, { body, headers });
  }

  async put<TResponse, TBody = unknown>(
    url: string,
    body?: TBody,
    headers?: Record<string, string>,
  ): Promise<HttpResponse<TResponse>> {
    return this.request<TResponse, TBody>('put', url, { body, headers });
  }

  async patch<TResponse, TBody = unknown>(
    url: string,
    body?: TBody,
    headers?: Record<string, string>,
  ): Promise<HttpResponse<TResponse>> {
    return this.request<TResponse, TBody>('patch', url, { body, headers });
  }

  async delete<TResponse>(
    url: string,
    query?: Record<string, unknown>,
    headers?: Record<string, string>,
  ): Promise<HttpResponse<TResponse>> {
    return this.request<TResponse>('delete', url, { query, headers });
  }
}
