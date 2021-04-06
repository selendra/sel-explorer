import { createSlice } from '@reduxjs/toolkit'
import api from '../../services/api'
import { nonFunc } from '@src/utils'
import extrinsic from '../../locale/messages/extrinsic'

const validatorsSlice = createSlice({
  name: 'validators',
  initialState: {
    validators: {
      items: [],
      page: 0,
      pageSize: 10,
      total: 0
    },
    unsettled: {
      items: [],
      page: 0,
      pageSize: 10,
      total: 0
    },
    trustees: {
      items: [],
      page: 0,
      pageSize: 10,
      total: 0
    },
    missed: {
      items: [],
      page: 0,
      pageSize: 10,
      total: 0
    },
    recentSlashed: {
      items: [],
      page: 0,
      pageSize: 10,
      total: 0
    },
    blocknum: {
      items: [],
      page: 0,
      pageSize: 10,
      total: 0
    },
    info: {
      items: [],
      page: 0,
      pageSize: 10,
      total: 0
    },
    unitmissed: {
      items: [],
      page: 0,
      pageSize: 10,
      total: 0
    },
    block: {
      items: [],
      page: 0,
      pageSize: 10,
      total: 0
    },
    validatorVotes: {
      items: [],
      page: 0,
      pageSize: 10,
      total: 0
    },
    searchData: {
      items: [],
      page: 0,
      pageSize: 10,
      total: 0
    },
    extrinsic: {
      items: [],
      page: 0,
      pageSize: 10,
      total: 0
    }
  },
  reducers: {
    setValidators(state, action) {
      state.validators = action.payload
    },
    setUnsettledNodes(state, action) {
      state.unsettled = action.payload
    },
    setTrusteeNodes(state, action) {
      state.trustees = action.payload
    },
    setMissed(state, action) {
      state.missed = action.payload
    },
    setRecentSlashed(state, action) {
      state.recentSlashed = action.payload
    },
    setBlockNum(state, action) {
      state.blocknum = action.payload
    },
    setValidatorInfo(state, action) {
      state.info = action.payload
    },
    setUnitMissed(state, action) {
      state.unitmissed = action.payload
    },
    setNodeBlock(state, action) {
      state.block = action.payload
    },
    setValidatorVotes(state, action) {
      state.validatorVotes = action.payload
    },
    setSearch(state, action) {
      state.searchData = action.payload
    },
    setSearchExtrinsic(state, action) {
      state.extrinsic = action.payload
    }
  }
})

export const {
  setValidators,
  setUnsettledNodes,
  setTrusteeNodes,
  setMissed,
  setRecentSlashed,
  setBlockNum,
  setValidatorInfo,
  setUnitMissed,
  setNodeBlock,
  setValidatorVotes,
  setSearch,
  setSearchExtrinsic
} = validatorsSlice.actions

export const fetchValidatorNodes = (
  setLoading = nonFunc,
  page,
  pageSize
) => async dispatch => {
  setLoading(true)
  try {
    const { result: validators } = await api.fetch(`/validators`, {
      page,
      pageSize
    })

    dispatch(setValidators(validators))
  } finally {
    setLoading(false)
  }
}

export const fetchValidator = (
  setLoading = nonFunc,
  page,
  pageSize
) => async dispatch => {
  setLoading(true)
  try {
    const { result: info } = await api.fetch(`/validators/all`, {
      page,
      pageSize
    })

    dispatch(setValidatorInfo(info))
  } finally {
    setLoading(false)
  }
}

export const fetchUnsettledNodes = (
  setLoading = nonFunc,
  page,
  pageSize
) => async dispatch => {
  setLoading(true)
  try {
    const { result: unsettled } = await api.fetch(`/unsettled`, {
      page,
      pageSize
    })

    dispatch(setUnsettledNodes(unsettled))
  } finally {
    setLoading(false)
  }
}

export const fetchTrusteeNodes = (
  setLoading = nonFunc,
  page,
  pageSize
) => async dispatch => {
  setLoading(true)
  try {
    const { result: trustees } = await api.fetch(`/trustees`, {
      page,
      pageSize
    })

    dispatch(setTrusteeNodes(trustees))
  } finally {
    setLoading(false)
  }
}

export const fetchMissed = (
  setLoading = nonFunc,
  page,
  pageSize
) => async dispatch => {
  setLoading(true)
  try {
    const { result: missed } = await api.fetch(`/missed`, {
      page,
      pageSize
    })

    dispatch(setMissed(missed))
  } finally {
    setLoading(false)
  }
}

export const fetchRecentSlashed = (
  setLoading = nonFunc,
  page,
  pageSize
) => async dispatch => {
  setLoading(true)
  try {
    const { result: recentSlashed } = await api.fetch(
      `/validators/recent_slashed`,
      {
        page,
        pageSize
      }
    )

    dispatch(setRecentSlashed(recentSlashed))
  } finally {
    setLoading(false)
  }
}

export const fetchUnitMissed = (
  setLoading = nonFunc,
  params,
  page,
  pageSize
) => async dispatch => {
  setLoading(true)
  try {
    const { result: unitmissed } = await api.fetch(`/unitmissed/${params}`, {
      page,
      pageSize
    })

    dispatch(setUnitMissed(unitmissed))
  } finally {
    setLoading(false)
  }
}

export const fetchblockNum = (
  setLoading = nonFunc,
  hash,
  page,
  pageSize
) => async dispatch => {
  setLoading(true)
  try {
    const { result: num } = await api.fetch(`/blocknum/${hash}`, {
      page,
      pageSize
    })

    dispatch(setBlockNum(num))
  } finally {
    setLoading(false)
  }
}

export const fetchNodeBlock = (
  setLoading = nonFunc,
  address,
  page,
  pageSize
) => async dispatch => {
  setLoading(true)
  try {
    const { result: block } = await api.fetch(`/nodeblock/${address}`, {
      page,
      pageSize
    })
    dispatch(setNodeBlock(block))
  } finally {
    setLoading(false)
  }
}

export const fetchEventSearch = (
  setLoading = nonFunc,
  search,
  page,
  pageSize
) => async dispatch => {
  setLoading(true)
  try {
    const { result: data } = await api.fetch(`/search/${search}`, {
      page,
      pageSize
    })
    dispatch(setSearch(data))
  } finally {
    setLoading(false)
  }
}

export const fetchExtrinsicSearch = (
  setLoading = nonFunc,
  search,
  page,
  pageSize
) => async dispatch => {
  setLoading(true)
  try {
    const { result: extrinsic } = await api.fetch(
      `/searchExtrinsic/${search}`,
      {
        page,
        pageSize
      }
    )
    dispatch(setSearchExtrinsic(extrinsic))
  } finally {
    setLoading(false)
  }
}

export const fetchValidatorVotes = (
  setLoading = nonFunc,
  address,
  page,
  pageSize
) => async dispatch => {
  setLoading(true)
  try {
    const { result: votes } = await api.fetch(`/validatorvotes/${address}`, {
      page,
      pageSize
    })
    dispatch(setValidatorVotes(votes))
  } finally {
    setLoading(false)
  }
}
export const extrinsicSearchSelector = state => state.validators.extrinsic
export const eventSearchSelector = state => state.validators.searchData
export const UnitMiseedSelector = state => state.validators.unitmissed
export const ValidatorInfoSelector = state => state.validators.info
export const BlockNumSelector = state => state.validators.blocknum
export const MissedSelector = state => state.validators.missed
export const RecentSlashedSelector = state => state.validators.recentSlashed
export const validatorNodesSelector = state => state.validators.validators
export const unsettledNodesSelector = state => state.validators.unsettled
export const trusteeNodesSelector = state => state.validators.trustees
export const NodeblockSelector = state => state.validators.block
export const validatorVotesSelector = state => state.validators.validatorVotes

export default validatorsSlice.reducer
