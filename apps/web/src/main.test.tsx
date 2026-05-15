import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const createRootMock = vi.fn();
const renderMock = vi.fn();

describe('main entrypoint', () => {
  beforeEach(() => {
    vi.resetModules();
    createRootMock.mockReturnValue({ render: renderMock });
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.doUnmock('react-dom/client');
    document.body.innerHTML = '';
  });

  it('mounts the app into the root element', async () => {
    document.body.innerHTML = '<div id="root"></div>';
    vi.doMock('react-dom/client', () => ({ createRoot: createRootMock }));

    await import('./main.tsx');

    expect(createRootMock).toHaveBeenCalledWith(document.getElementById('root'));
    expect(renderMock).toHaveBeenCalledTimes(1);
  });

  it('throws when the root element is missing', async () => {
    vi.doMock('react-dom/client', () => ({ createRoot: createRootMock }));

    await expect(import('./main.tsx')).rejects.toThrow('Petal root element was not found.');
    expect(createRootMock).not.toHaveBeenCalled();
  });
});
