import {
  makeSyncComputeCacheByArguments,
  makeAsyncComputeCacheByArguments,
  makeSyncComputeCacheByOptions,
  makeAsyncComputeCacheByOptions,
} from '../src/cache-compute'
import sinon from 'sinon'
import { expect } from 'chai'

describe('cache-compute.ts', () => {
  let userList = [1, 2, 3, 4, 5]

  context('makeSyncComputeCacheByArguments', () => {
    function listUser(users: any[], offset: number, count: number) {
      return users.slice(offset, offset + count)
    }
    it('should invoke callback initially', () => {
      let sendUserList = sinon.fake()
      let checkListUser = makeSyncComputeCacheByArguments(
        listUser,
        sendUserList,
      )
      checkListUser(userList, 2, 2)
      let calls = sendUserList.getCalls()
      expect(calls.length).to.equals(1)
      expect(calls[0].args).to.deep.equals([[3, 4]])
    })

    it('should not invoke callback if given same arguments', () => {
      let sendUserList = sinon.fake()
      let checkListUser = makeSyncComputeCacheByArguments(
        listUser,
        sendUserList,
      )
      checkListUser(userList, 2, 2)
      checkListUser(userList, 2, 2)
      let calls = sendUserList.getCalls()
      expect(calls.length).to.equals(1)
      expect(calls[0].args).to.deep.equals([[3, 4]])
    })

    it('should invoke callback if given different arguments', () => {
      let sendUserList = sinon.fake()
      let checkListUser = makeSyncComputeCacheByArguments(
        listUser,
        sendUserList,
      )
      checkListUser(userList, 2, 2)
      checkListUser(userList, 3, 2)
      let calls = sendUserList.getCalls()
      expect(calls.length).to.equals(2)
      expect(calls[0].args).to.deep.equals([[3, 4]])
      expect(calls[1].args).to.deep.equals([[4, 5]])
    })
  })

  context('makeAsyncComputeCacheByArguments', () => {
    async function listUser(users: any[], offset: number, count: number) {
      return users.slice(offset, offset + count)
    }
    it('should invoke callback initially', async () => {
      let sendUserList = sinon.fake()
      let checkListUser = makeAsyncComputeCacheByArguments(
        listUser,
        sendUserList,
      )
      await checkListUser(userList, 2, 2)
      let calls = sendUserList.getCalls()
      expect(calls.length).to.equals(1)
      expect(calls[0].args).to.deep.equals([[3, 4]])
    })

    it('should not invoke callback if given same arguments', async () => {
      let sendUserList = sinon.fake()
      let checkListUser = makeAsyncComputeCacheByArguments(
        listUser,
        sendUserList,
      )
      await checkListUser(userList, 2, 2)
      await checkListUser(userList, 2, 2)
      let calls = sendUserList.getCalls()
      expect(calls.length).to.equals(1)
      expect(calls[0].args).to.deep.equals([[3, 4]])
    })

    it('should invoke callback if given different arguments', async () => {
      let sendUserList = sinon.fake()
      let checkListUser = makeAsyncComputeCacheByArguments(
        listUser,
        sendUserList,
      )
      await checkListUser(userList, 2, 2)
      await checkListUser(userList, 3, 2)
      let calls = sendUserList.getCalls()
      expect(calls.length).to.equals(2)
      expect(calls[0].args).to.deep.equals([[3, 4]])
      expect(calls[1].args).to.deep.equals([[4, 5]])
    })
  })

  context('makeSyncComputeCacheByOptions', () => {
    let users = userList
    function listUser(options: {
      users: any[]
      offset: number
      count: number
    }) {
      const { users, offset, count } = options
      return users.slice(offset, offset + count)
    }
    it('should invoke callback initially', () => {
      let sendUserList = sinon.fake()
      let checkListUser = makeSyncComputeCacheByOptions(listUser, sendUserList)
      checkListUser({ users, offset: 2, count: 2 })
      let calls = sendUserList.getCalls()
      expect(calls.length).to.equals(1)
      expect(calls[0].args).to.deep.equals([[3, 4]])
    })

    it('should not invoke callback if given same options', () => {
      let sendUserList = sinon.fake()
      let checkListUser = makeSyncComputeCacheByOptions(listUser, sendUserList)
      checkListUser({ users, offset: 2, count: 2 })
      checkListUser({ users, offset: 2, count: 2 })
      let calls = sendUserList.getCalls()
      expect(calls.length).to.equals(1)
      expect(calls[0].args).to.deep.equals([[3, 4]])
    })

    it('should invoke callback if given different options', () => {
      let sendUserList = sinon.fake()
      let checkListUser = makeSyncComputeCacheByOptions(listUser, sendUserList)
      checkListUser({ users, offset: 2, count: 2 })
      checkListUser({ users, offset: 3, count: 2 })
      let calls = sendUserList.getCalls()
      expect(calls.length).to.equals(2)
      expect(calls[0].args).to.deep.equals([[3, 4]])
      expect(calls[1].args).to.deep.equals([[4, 5]])
    })
  })

  context('makeAsyncComputeCacheByOptions', () => {
    let users = userList
    async function listUser(options: {
      users: any[]
      offset: number
      count: number
    }) {
      const { users, offset, count } = options
      return users.slice(offset, offset + count)
    }
    it('should invoke callback initially', async () => {
      let sendUserList = sinon.fake()
      let checkListUser = makeAsyncComputeCacheByOptions(listUser, sendUserList)
      await checkListUser({ users, offset: 2, count: 2 })
      let calls = sendUserList.getCalls()
      expect(calls.length).to.equals(1)
      expect(calls[0].args).to.deep.equals([[3, 4]])
    })

    it('should not invoke callback if given same options', async () => {
      let sendUserList = sinon.fake()
      let checkListUser = makeAsyncComputeCacheByOptions(listUser, sendUserList)
      await checkListUser({ users, offset: 2, count: 2 })
      await checkListUser({ users, offset: 2, count: 2 })
      let calls = sendUserList.getCalls()
      expect(calls.length).to.equals(1)
      expect(calls[0].args).to.deep.equals([[3, 4]])
    })

    it('should invoke callback if given different options', async () => {
      let sendUserList = sinon.fake()
      let checkListUser = makeAsyncComputeCacheByOptions(listUser, sendUserList)
      await checkListUser({ users, offset: 2, count: 2 })
      await checkListUser({ users, offset: 3, count: 2 })
      let calls = sendUserList.getCalls()
      expect(calls.length).to.equals(2)
      expect(calls[0].args).to.deep.equals([[3, 4]])
      expect(calls[1].args).to.deep.equals([[4, 5]])
    })
  })
})
