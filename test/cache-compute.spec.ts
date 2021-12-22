import {
  makeSyncComputeCacheByArguments,
  makeAsyncComputeCacheByArguments,
  makeSyncComputeCacheByOptions,
  makeAsyncComputeCacheByOptions,
  newComputeByArgumentsCachePool,
  newComputeByOptionsCachePool,
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

  context('newComputeByArgumentsCachePool', () => {
    it('should persist cached state across multiple invoke for sync compute', () => {
      let computeFn = sinon.fake((a: number, b: number) => a + b)
      let cachePool = newComputeByArgumentsCachePool(computeFn)

      let callback = sinon.fake()

      let compute1 = cachePool(callback)
      let compute2 = cachePool(callback)

      expect(callback.notCalled)

      compute1(3, 4)

      expect(callback.calledOnce)
      expect(computeFn.calledOnce)

      compute2(3, 4)

      expect(callback.calledOnce)
      expect(computeFn.calledOnce)

      compute2(5, 4)

      expect(callback.calledTwice)
      expect(computeFn.calledTwice)

      expect(computeFn.getCall(0).returnValue).to.equals(7)
      expect(computeFn.getCall(1).returnValue).to.equals(9)
    })

    it('should persist cached async state across multiple invoke for async compute', async () => {
      let computeFn = sinon.fake(async (a: number, b: number) => a + b)
      let cachePool = newComputeByArgumentsCachePool(computeFn)

      let callback = sinon.fake()

      let compute1 = cachePool(callback)
      let compute2 = cachePool(callback)

      expect(callback.notCalled)

      compute1(3, 4)

      expect(callback.calledOnce)
      expect(computeFn.calledOnce)

      compute2(3, 4)

      expect(callback.calledOnce)
      expect(computeFn.calledOnce)

      compute2(5, 4)

      expect(callback.calledTwice)
      expect(computeFn.calledTwice)

      expect(await computeFn.getCall(0).returnValue).to.equals(7)
      expect(await computeFn.getCall(1).returnValue).to.equals(9)
    })
  })

  context('newComputeByOptionsCachePool', () => {
    type Options = { a: number; b: number }
    it('should persist cached state across multiple invoke for sync compute', () => {
      let computeFn = sinon.fake(({ a, b }: Options) => a + b)
      let cachePool = newComputeByOptionsCachePool(computeFn)

      let callback = sinon.fake()

      let compute1 = cachePool(callback)
      let compute2 = cachePool(callback)

      expect(callback.notCalled)

      compute1({ a: 3, b: 4 })

      expect(callback.calledOnce)
      expect(computeFn.calledOnce)

      compute2({ a: 3, b: 4 })

      expect(callback.calledOnce)
      expect(computeFn.calledOnce)

      compute2({ a: 5, b: 4 })

      expect(callback.calledTwice)
      expect(computeFn.calledTwice)

      expect(computeFn.getCall(0).returnValue).to.equals(7)
      expect(computeFn.getCall(1).returnValue).to.equals(9)
    })

    it('should persist cached async state across multiple invoke for async compute', async () => {
      let computeFn = sinon.fake(async ({ a, b }: Options) => a + b)
      let cachePool = newComputeByOptionsCachePool(computeFn)

      let callback = sinon.fake()

      let compute1 = cachePool(callback)
      let compute2 = cachePool(callback)

      expect(callback.notCalled)

      compute1({ a: 3, b: 4 })

      expect(callback.calledOnce)
      expect(computeFn.calledOnce)

      compute2({ a: 3, b: 4 })

      expect(callback.calledOnce)
      expect(computeFn.calledOnce)

      compute2({ a: 5, b: 4 })

      expect(callback.calledTwice)
      expect(computeFn.calledTwice)

      expect(await computeFn.getCall(0).returnValue).to.equals(7)
      expect(await computeFn.getCall(1).returnValue).to.equals(9)
    })
  })
})
