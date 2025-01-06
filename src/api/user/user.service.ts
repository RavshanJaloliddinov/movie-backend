import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/core/entity/user.entity';
import { UserRepository } from 'src/core/repository/user.repository';
import { MovieEntity } from 'src/core/entity';
import { MovieRepository } from 'src/core/repository';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserEntity) private readonly userRepo: UserRepository,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const user = this.userRepo.create(createUserDto);
    return await this.userRepo.save(user);
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepo.find();
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return await this.userRepo.findOne({ where: { email } })
  }

  async findOne(id: string): Promise<UserEntity> {  // id ni string formatga o'zgartirdik
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {  // id ni string formatga o'zgartirdik
    await this.findOne(id);
    await this.userRepo.update(id, updateUserDto);
    return await this.findOne(id);
  }

  async remove(id: string): Promise<void> {  // id ni string formatga o'zgartirdik
    const user = await this.findOne(id);
    await this.userRepo.remove(user);
  }

  // async addFavoriteMovie(userId: string, movieId: string): Promise<UserEntity> {
  //   // Foydalanuvchini topish
  //   const user = await this.userRepo.findOne({
  //     where: { id: userId },
  //     relations: ['favoriteMovies'], // favoriteMoviesni yuklash
  //   });
  //   if (!user) {
  //     throw new NotFoundException('User not found');
  //   }

  //   // Filmni topish
  //   const movie = await this.movieRepo.findOne({ where: { id: movieId } });
  //   if (!movie) {
  //     throw new NotFoundException('Movie not found');
  //   }

  //   // Sevimli filmlar arrayiga qo'shish
  //   user.favoriteMovies.push(movie);
  //   return await this.userRepo.save(user); // Yangilangan userni saqlash
  // }
}
