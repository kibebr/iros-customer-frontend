// a functor instance for Promises
// (a -> b) -> Promise<a> -> Promise<b>
export const map = <A, B>(f: ((_: A) => B)) => (p: Promise<A>): Promise<B> => p.then(f)
