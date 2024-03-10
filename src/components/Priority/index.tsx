import styles from './priority.module.css'

interface PriorityProps {
    type: 'low' | 'medium' | 'high' | 'finished';
}

export default function Priority({ type }: PriorityProps) {

    function getPriorityText() {
        switch (type) {
            case 'low':
                return '🟢 Baixa prioridade';
            case 'medium':
                return '🟡 Média prioridade';
            case 'high':
                return '🔴 Alta prioridade';
            case 'finished':
                return '✅ Concluída';
            default:
                return '🟢 Baixa prioridade';
        }
    }

    return (
        <>
            <span className={styles[type]}>
                {getPriorityText()}
            </span>
        </>
    )
}