export class CreatePostDto {

  readonly title: string;
  readonly content: string;
  readonly userId: number;   // по хорошему нужно доставать id из токена,
                             // но пока что сделал доставание id из dto
}
