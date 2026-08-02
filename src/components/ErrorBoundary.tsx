import React from 'react';

type Props = {
  children: React.ReactNode;
};

type State = {
  error: Error | null;
};

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 text-slate-100 p-6">
          <div className="max-w-lg w-full rounded-2xl border border-rose-900/50 bg-slate-900 p-6 space-y-3">
            <h1 className="text-lg font-bold text-rose-300">앱을 불러오지 못했습니다</h1>
            <p className="text-sm text-slate-300">
              저장된 설정 데이터가 손상되었을 수 있습니다. 아래 버튼으로 초기화 후 다시 시도해 주세요.
            </p>
            <pre className="text-xs text-slate-400 overflow-auto max-h-32 whitespace-pre-wrap">
              {this.state.error.message}
            </pre>
            <button
              type="button"
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm font-semibold"
              onClick={() => {
                [
                  'oae_active_book',
                  'oae_active_chapter',
                  'oae_reader_settings',
                  'oae_bookmarks',
                  'oae_highlights',
                  'oae_notes',
                  'oae_completed',
                ].forEach((key) => localStorage.removeItem(key));
                window.location.reload();
              }}
            >
              데이터 초기화 후 새로고침
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
