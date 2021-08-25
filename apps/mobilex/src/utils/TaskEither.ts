import { TaskEither } from 'fp-ts/TaskEither'
import { Either } from 'fp-ts/Either'

export const run = <E, A>(t: TaskEither<E, A>): Promise<Either<E, A>> => t()
