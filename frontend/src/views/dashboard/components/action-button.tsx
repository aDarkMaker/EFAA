import clsx from 'clsx'

interface ActionButtonProps {
  label: string
  onClick?: () => void
  icon?: string
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  onClick,
  icon = 'ri-play-fill',
}) => {
  return (
    <button
      className={clsx(
        'bg-accent text-text-reverse border-none px-10 py-4 text-xl font-bold rounded-lg cursor-pointer',
        'flex items-center gap-2.5 transition-all hover:-translate-y-0.5',
      )}
      style={{
        fontFamily: "'MiSans-Bold', sans-serif",
        boxShadow: '0 4px 20px rgba(254, 250, 83, 0.3)',
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 8px 30px rgba(254, 250, 83, 0.4)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 20px rgba(254, 250, 83, 0.3)'
      }}
    >
      <i className={`${icon} text-2xl`} />
      {label}
    </button>
  )
}
