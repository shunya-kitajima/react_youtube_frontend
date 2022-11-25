import React, { useReducer, ChangeEvent, FormEvent } from 'react'
import { withCookies } from 'react-cookie'
import axios from 'axios'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import { CircularProgress } from '@material-ui/core'
import {
  START_FETCH,
  FETCH_SUCCESS,
  ERROR_CATCHED,
  INPUT_EDIT,
  TOGGLE_MODE,
} from './actionTypes'
import { Action, InitialState } from '../types'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  span: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: 'teal',
    cursor: 'pointer',
  },
  spanError: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: 'fuchsia',
    marginTop: 10,
  },
}))

const initialState: InitialState = {
  isLoading: false,
  isLoginView: true,
  error: '',
  credentialsLog: {
    email: '',
    password: '',
  },
}

const loginReducer = (state: InitialState, action: Action): InitialState => {
  switch (action.type) {
    case START_FETCH: {
      return {
        ...state,
        isLoading: true,
      }
    }
    case FETCH_SUCCESS: {
      return {
        ...state,
        isLoading: false,
      }
    }
    case ERROR_CATCHED: {
      return {
        ...state,
        error: 'Email or Password is not correct',
        isLoading: false,
      }
    }
    case INPUT_EDIT: {
      return {
        ...state,
        error: '',
        credentialsLog: {
          ...state.credentialsLog,
          [action.inputName]: action.payload,
        },
      }
    }
    case TOGGLE_MODE: {
      return {
        ...state,
        isLoginView: !state.isLoginView,
      }
    }
    default: {
      return state
    }
  }
}

const Login: React.FC = (props: any) => {
  const classes = useStyles()
  const [state, dispatch] = useReducer(loginReducer, initialState)

  const inputChangedLog = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    e.preventDefault()
    dispatch({
      type: INPUT_EDIT,
      inputName: e.target.name,
      payload: e.target.value,
    })
  }

  const login = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (state.isLoginView) {
      try {
        dispatch({
          type: START_FETCH,
          inputName: 'state.isLoginView',
          payload: {},
        })
        const res = await axios.post(
          'http://127.0.0.1:8000/authen/jwt/create/',
          state.credentialsLog,
          {
            headers: { 'Content-Type': 'application/json' },
          }
        )
        if (res.data.access === '') {
          dispatch({
            type: FETCH_SUCCESS,
            inputName: 'state.isLoading',
            payload: {},
          })
          window.location.href = '/'
        } else {
          dispatch({
            type: FETCH_SUCCESS,
            inputName: 'state.isLoading',
            payload: {},
          })
          props.cookies.set('jwt-token', res.data.access)
          window.location.href = '/youtube'
        }
      } catch (err: any) {
        dispatch({
          type: ERROR_CATCHED,
          inputName: 'state.isLoading',
          payload: {},
        })
      }
    } else {
      try {
        dispatch({
          type: START_FETCH,
          inputName: 'state.isLoginView',
          payload: {},
        })
        await axios.post(
          'http://127.0.0.1:8000/api/create/',
          state.credentialsLog,
          {
            headers: { 'Content-Type': 'application/json' },
          }
        )
        const res = await axios.post(
          'http://127.0.0.1:8000/authen/jwt/create/',
          state.credentialsLog,
          {
            headers: { 'Content-Type': 'application/json' },
          }
        )
        if (res.data.access === '') {
          dispatch({
            type: FETCH_SUCCESS,
            inputName: 'state.isLoading',
            payload: {},
          })
          window.location.href = '/'
        } else {
          dispatch({
            type: FETCH_SUCCESS,
            inputName: 'state.isLoading',
            payload: {},
          })
          props.cookies.set('jwt-token', res.data.access)
          window.location.href = '/youtube'
        }
      } catch (err: any) {
        dispatch({
          type: ERROR_CATCHED,
          inputName: 'state.isLoading',
          payload: {},
        })
      }
    }
  }

  const toggleView = (): void => {
    dispatch({
      type: TOGGLE_MODE,
      inputName: 'state.isLoginView',
      payload: {},
    })
  }

  return (
    <Container maxWidth="xs">
      <form onSubmit={login}>
        <div className={classes.paper}>
          {state.isLoading && <CircularProgress />}
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5">
            {state.isLoginView ? 'Login' : 'Register'}
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Email"
            name="email"
            value={state.credentialsLog.email}
            onChange={(e) => inputChangedLog(e)}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={state.credentialsLog.password}
            onChange={(e) => inputChangedLog(e)}
          />
          <span className={classes.spanError}>{state.error}</span>
          {state.isLoginView ? (
            state.credentialsLog.email === '' ||
            state.credentialsLog.password === '' ? (
              <Button
                className={classes.submit}
                type="submit"
                fullWidth
                disabled
                variant="contained"
                color="primary"
              >
                Login
              </Button>
            ) : (
              <Button
                className={classes.submit}
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Login
              </Button>
            )
          ) : state.credentialsLog.email === '' ||
            state.credentialsLog.password === '' ? (
            <Button
              className={classes.submit}
              type="submit"
              fullWidth
              disabled
              variant="contained"
              color="primary"
            >
              Register
            </Button>
          ) : (
            <Button
              className={classes.submit}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              Register
            </Button>
          )}
          <span onClick={() => toggleView()} className={classes.span}>
            {state.isLoginView ? 'Create Account ?' : 'Back to Login ?'}
          </span>
        </div>
      </form>
    </Container>
  )
}

export default withCookies(Login)
