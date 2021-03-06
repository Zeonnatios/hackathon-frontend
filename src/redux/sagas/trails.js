import { notification } from 'antd';
import { all, fork, call, put, takeEvery, select } from 'redux-saga/effects';

import { constants } from '../modules/trails';
import * as api from '../api/trails';
// eslint-disable-next-line

// GET_ALL_TRAILS

function* getAllTrails() {
  try {
    const { data: payload } = yield call(api.allTrails);
    yield put({ type: constants.GET_ALL_TRAILS.SUCCESS, payload });
  } catch (e) {
    yield put({
      type: constants.GET_ALL_TRAILS.FAILED,
      message: e.response.data.message,
    });
    notification.error({
      message: e.response.data.message,
    });
  }
}

function* getTrailsByTechnology(action) {
  try {
    const { data: payload } = yield call(
      api.trailsByTechnology,
      action.technology,
    );
    yield put({ type: constants.GET_TRAILS_BY_TECHNOLOGY.SUCCESS, payload });
  } catch (e) {
    yield put({
      type: constants.GET_TRAILS_BY_TECHNOLOGY.FAILED,
      message: e.response.data.message,
    });
    notification.error({
      message: e.response.data.message,
    });
  }
}

function* getAllTechnologies() {
  try {
    const { data: payload } = yield call(api.allTechnologies);
    yield put({ type: constants.GET_ALL_TECHNOLOGIES.SUCCESS, payload });
  } catch (e) {
    yield put({
      type: constants.GET_ALL_TECHNOLOGIES.FAILED,
      message: e.response.data.message,
    });
    notification.error({
      message: e.response.data.message,
    });
  }
}

function* getMyTrails(action) {
  try {
    const payload = yield call(api.myTrails, action);
    yield put({ type: constants.GET_MY_TRAILS.SUCCESS, payload: payload.data });
  } catch (e) {
    yield put({
      type: constants.GET_MY_TRAILS.FAILED,
      message: e?.response?.data?.message,
    });
    notification.error({
      message: e.response.data.message,
    });
  }
}

function* createTrail(action) {
  try {
    const { user } = yield select((state) => state.auth);
    const payload = yield call(api.createTrail, action, user.name);
    yield put({ type: constants.CREATE_TRAIL.SUCCESS, payload: payload?.data });
  } catch (e) {
    yield put({
      type: constants.CREATE_TRAIL.FAILED,
      message: e.response?.data?.message,
    });
    notification.error({
      message: e.response?.data?.message,
    });
  }
}

function* getTrailById(action) {
  try {
    const payload = yield call(api.getTrailById, action);
    yield put({ type: constants.GET_TRAIL_BY_ID.SUCCESS, payload: payload?.data });
  } catch (e) {
    yield put({
      type: constants.GET_TRAIL_BY_ID.FAILED,
      message: e.response?.data?.message,
    });
    notification.error({
      message: e.response?.data?.message,
    });
  }
}

// Watchers Sagas

function* watchGetAllTrails() {
  yield takeEvery(constants.GET_ALL_TRAILS.ACTION, getAllTrails);
}

function* watchGetTrailsByTechnology() {
  yield takeEvery(
    constants.GET_TRAILS_BY_TECHNOLOGY.ACTION,
    getTrailsByTechnology,
  );
}

function* watchGetAllTechnologies() {
  yield takeEvery(constants.GET_ALL_TECHNOLOGIES.ACTION, getAllTechnologies);
}

function* watchGetMyTrails() {
  yield takeEvery(constants.GET_MY_TRAILS.ACTION, getMyTrails);
}

function* watchCreateTrail() {
  yield takeEvery(constants.CREATE_TRAIL.ACTION, createTrail);
}

function* watchGetTrailsById() {
  yield takeEvery(constants.GET_TRAIL_BY_ID.ACTION, getTrailById);
}
/**
 * Export the root saga by forking all available sagas.
 */
export default function* rootAuth() {
  yield all([
    fork(watchGetAllTrails),
    fork(watchGetAllTechnologies),
    fork(watchGetTrailsByTechnology),
    fork(watchGetMyTrails),
    fork(watchCreateTrail),
    fork(watchGetTrailsById),
  ]);
}
