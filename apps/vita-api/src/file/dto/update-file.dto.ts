import { PartialType } from '@nestjs/mapped-types'
import { DeleteFileDto } from './delete-file.dto'

export class UpdateFileDto extends PartialType(DeleteFileDto) {}
