import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = "roles"; // потом по этому ключу мы сможем получать
                                  // какие-то мета-данные внутри гварда

/* создаём декоратор, который аргументом будет принимать список ролей, которым доступен метод
   в users.controller мы напишем @Roles("ADMIN") */
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);
