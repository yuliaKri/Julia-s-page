import { sendMessage } from './chatService';

describe('chatService', () => {
  const fetchMock = jest.fn();
  let consoleErrorMock: jest.SpyInstance;

  beforeEach(() => {
    fetchMock.mockReset();
    global.fetch = fetchMock;
    consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  afterEach(() => consoleErrorMock.mockRestore());

  it('sends flat conversation messages to the server-side chat API', async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({ message: 'Yulia is a senior software engineer.' }),
    });

    const answer = await sendMessage(
      [{ role: 'assistant', text: 'How can I help?' }],
      'Tell me about Yulia.'
    );

    expect(answer).toBe('Yulia is a senior software engineer.');
    expect(fetchMock).toHaveBeenCalledTimes(1);

    const [url, options] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe('http://127.0.0.1:8787');
    expect(options.method).toBe('POST');
    expect(JSON.parse(options.body as string)).toEqual({
      history: [{ role: 'assistant', text: 'How can I help?' }],
      message: 'Tell me about Yulia.',
    });
  });

  it('returns a friendly message when the chat API is unavailable', async () => {
    fetchMock.mockRejectedValue(new Error('Network unavailable'));

    await expect(sendMessage([], 'Hello')).resolves.toBe(
      "I'm having trouble connecting right now. Please try again shortly."
    );
  });
});
