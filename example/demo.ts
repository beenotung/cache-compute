import { makeSyncComputeCacheByArguments } from 'cache-compute'

type User = {
  name: string
  birthday: number
}
type Profile = {
  name: string
  age: number
}

let users: User[] = [
  { name: 'Alice', birthday: new Date('2000-01-01').getTime() },
  { name: 'Bob', birthday: new Date('2000-02-02').getTime() },
]

const YEAR = 1000 * 60 * 60 * 24 * 365.25

function toProfile(user: User): Profile {
  const now = Date.now()
  return {
    name: user.name,
    age: Math.floor((now - user.birthday) / YEAR),
  }
}

function updateUser(index: number, user: Partial<User>) {
  users = [...users]
  users[index] = { ...users[index], ...user }
  runSelectors()
}

let selectors: Array<() => void> = []

function runSelectors() {
  selectors.forEach(fn => fn())
}

function watchProfile(index: number) {
  function watchUsers(profile: Profile) {
    // e.g. push to websocket client
    console.log({ index, profile })
  }

  const checkUsers = makeSyncComputeCacheByArguments(toProfile, watchUsers)

  const selector = () => checkUsers(users[index])
  selector()
  selectors.push(selector)
}

console.log('== init ==')
watchProfile(0)
watchProfile(1)

console.log('== update alice ==')
updateUser(0, { name: 'Alex' })

console.log('== update bob ==')
updateUser(1, { name: 'Bobby' })
