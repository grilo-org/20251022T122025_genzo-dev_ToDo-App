import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskResponseDto } from './dto/task-response.dto';
import type { AuthenticatedRequest } from 'src/auth/types/authenticated-request';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(JwtAuthGuard)
  @Post('me')
  async create(@Req() req: AuthenticatedRequest, @Body() dto: CreateTaskDto) {
    const task = await this.taskService.create(dto, req.user);
    return new TaskResponseDto(task);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async findAllTask(@Req() req: AuthenticatedRequest) {
    const tasks = await this.taskService.findAllTask(req.user);
    return tasks.map((task) => new TaskResponseDto(task));
  }

  @UseGuards(JwtAuthGuard)
  @Get('me/done')
  async findAllDone(@Req() req: AuthenticatedRequest) {
    const tasksDone = await this.taskService.findAllTaskByStatus(
      true,
      req.user,
    );
    return tasksDone.map((task) => new TaskResponseDto(task));
  }

  @UseGuards(JwtAuthGuard)
  @Get('me/pending')
  async findAllPending(@Req() req: AuthenticatedRequest) {
    const tasksDone = await this.taskService.findAllTaskByStatus(
      false,
      req.user,
    );
    return tasksDone.map((task) => new TaskResponseDto(task));
  }

  @UseGuards(JwtAuthGuard)
  @Get('me/:id')
  async findTaskById(
    @Req() req: AuthenticatedRequest,
    @Param('id') id: string,
  ) {
    return await this.taskService.findTaskById(id, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me/:id/done')
  async toogleDone(@Req() req: AuthenticatedRequest, @Param('id') id: string) {
    return this.taskService.toogleDone(id, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me/:id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req: AuthenticatedRequest,
    @Body() dto: UpdateTaskDto,
  ) {
    const task = await this.taskService.update({ id }, dto, req.user);

    return new TaskResponseDto(task);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('me/:id')
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
    @Req() req: AuthenticatedRequest,
  ) {
    const task = await this.taskService.remove({ id }, req.user);
    return new TaskResponseDto(task);
  }
}
