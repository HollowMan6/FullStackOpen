import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { createNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
    return (
        <div>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={handleClick}>vote</button>
            </div>
        </div>
    )
}

const AnecdoteList = ({anecdotes, createNotification, vote}) => {
    const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)
    return (
        <div>
            {sortedAnecdotes.map(anecdote =>
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleClick={() => {
                        createNotification(`You voted '${anecdote.content}'`, 5)
                        return vote(anecdote.id)
                    }}
                />
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
    if (state.filter === 'ALL') {
        return {
            anecdotes: state.anecdotes
        }
    }
    return {
        anecdotes: state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
    }
}

const mapDispatchToProps = {
    createNotification,
    vote
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AnecdoteList)
