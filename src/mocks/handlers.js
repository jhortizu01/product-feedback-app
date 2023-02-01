// src/mocks/handlers.js
import { rest } from 'msw';
import { productRequests } from './mockdata';

export const handlers = [
  rest.get('/api/productrequests', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(productRequests));
  }),

  rest.get('/api/user', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        image: './assets/user-images/image-zena.jpg',
        name: 'Zena Kelley',
        username: 'velvetround',
      }),
    );
  }),

  rest.post('/api/productrequests', async (req, res, ctx) => {
    console.log(req);
    return res(ctx.status(200), ctx.json(req.body));
  }),

  //   rest.post('/api/productRequests', (req, res, ctx) => {
  //     return res(
  // 2.    ctx.status(201),
  // 3.    ctx.json({
  //         data: {
  //           id: 'e6f36a',
  //           title: 'Liverpool FC',
  //           authorId: '5303d74c64f66366f00cb9b2a94f3251bf5',
  //           tags: ['football', 'sport', 'Liverpool'],
  //           url: 'https://medium.com/@majelbstoat/liverpool-fc-e6f36a',
  //           canonicalUrl: 'http://jamietalbot.com/posts/liverpool-fc',
  //           publishStatus: 'public',
  //           publishedAt: 1442286338435,
  //           license: 'all-rights-reserved',
  //           licenseUrl: 'https://medium.com/policy/9db0094a1e0f',
  //         },
  //       })
  //     )
  //   })
];
