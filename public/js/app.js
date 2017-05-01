const DreamsDashboard = React.createClass({
    getInitialState: function () {
        return {
            dreams: [],
        };
    },
    componentDidMount: function () {
        this.loadDreamsFromServer();
        setInterval(this.loadDreamsFromServer, 5000);
    },
    loadDreamsFromServer: function () {
        client.getDreams((serverDreams) => (
            this.setState({ dreams: serverDreams })
        )
    );
},
handleEditFormSubmit: function (attrs) {
    this.updateDream(attrs);
},
handleTrashClick: function (dreamId) {
    this.deleteDream(dreamId)
},
handleUpvote: function (dreamId) {
    this.upvoteDream(dreamId)
},
handleDownvote: function (dreamId) {
    this.downvoteDream(dreamId)
},
handleCreateFormSubmit: function(dream){
    this.createDream(dream);
},
createDream: function(dream){
    const d = helpers.newDream(dream);
    this.setState({
        dreams: this.state.dreams.concat(d),
    });
    client.createDream(d);
},
updateDream: function(attrs){
    this.setState({
        dreams: this.state.dreams.map((dream) => {
            if (dream.id === attrs.id) {
                return Object.assign({}, dream, {
                    title: attrs.title,
                    description: attrs.description,
                    id: attrs.id,
                    dreamImg: attrs.dreamImg,
                    date: attrs.date,
                    votes: attrs.votes,
                });
            } else {
                return dream;
            }
        }),
    });
    client.updateDream(attrs);
},
deleteDream: function (dreamId) {
    this.setState({
        dreams: this.state.dreams.filter(d => d.id !== dreamId),
    });
    client.deleteDream(
        { id: dreamId }
    )
},
upvoteDream: function (dreamId) {
    const nextDreams = this.state.dreams.map((dream) => {
        if (dream.id === dreamId) {
            client.upvoteDream({
                    id: dreamId,
                    votes: dream.votes
                });
            return Object.assign({}, dream, {
                votes: dream.votes + 1,
            });
        } else {
            return dream;
        }
    });
    this.setState({
        dreams: nextDreams,
    });
},
downvoteDream: function (dreamId) {
    const nextDreams = this.state.dreams.map((dream) => {
        if (dream.id === dreamId) {
            return Object.assign({}, dream, {
                votes: dream.votes - 1,
            });
        } else {
            return dream;
        }
    });
    this.setState({
        dreams: nextDreams,
    });
    client.downvoteDream(
        { id: dreamId }
    );
},
render: function () {
    return (
        <div className='ui three column centered grid'>
            <div className='column'>
                <EditableDreamList
                    dreams={this.state.dreams}
                    onFormSubmit={this.handleEditFormSubmit}
                    onTrashClick={this.handleTrashClick}
                    onUpvote={this.handleUpvote}
                    onDownvote={this.handleDownvote}
                />
                <ToggleableDreamForm
                    onFormSubmit={this.handleCreateFormSubmit}
                />
            </div>
        </div>
    )
}
});

const EditableDreamList = React.createClass({
    render: function () {
        const dreamData = this.props.dreams.sort((a, b) => (
            b.votes - a.votes
        ))
        const dreams = dreamData.map((dream) => (
            <EditableDream
                title={dream.title}
                id={dream.id}
                key={dream.id}
                description={dream.description}
                date={dream.date}
                private={dream.private}
                dreamImg={dream.dream_image_url}
                votes={dream.votes}
                onFormSubmit={this.props.onFormSubmit}
                onTrashClick={this.props.onTrashClick}
                onUpvote={this.props.onUpvote}
                onDownvote={this.props.onDownvote}
            />
        ))
        return (
            <div id='dreams'>
                {dreams}
            </div>
        ); },
    });

    const EditableDream = React.createClass({
        getInitialState: function(){
            return {
                editFormOpen: false,
            };
        },
        handleEditClick: function () {
            this.openForm();
        },
        handleFormClose: function () {
            this.closeForm();
        },
        handleSubmit: function (dream) {
            this.props.onFormSubmit(dream);
            this.closeForm();
        },
        closeForm: function () {
            this.setState({ editFormOpen: false });
        },
        openForm: function () {
            this.setState({ editFormOpen: true });
        },
        render: function () {
            if(this.state.editFormOpen) {
                return (
                    <DreamForm
                        id={this.props.id}
                        title={this.props.title}
                        description={this.props.description}
                        dreamImg={this.props.dreamImg}
                        date={this.props.date}
                        onFormSubmit={this.handleSubmit}
                        onFormClose={this.handleFormClose}
                    />
                );

            } else {
                return (
                    <Dream
                        id={this.props.id}
                        title={this.props.title}
                        description={this.props.description}
                        date={this.props.date}
                        private={this.props.private}
                        dreamImg={this.props.dreamImg}
                        votes={this.props.votes}
                        onEditClick={this.handleEditClick}
                        onTrashClick={this.props.onTrashClick}
                        onUpvote={this.props.onUpvote}
                        onDownvote={this.props.onDownvote}
                    />
                );
            }
        }
    });

    const DreamForm = React.createClass({
        handleSubmit: function(){
            this.props.onFormSubmit({
                id: this.props.id,
                title: this.refs.title.value,
                description: this.refs.description.value,
                dreamImg: this.refs.dreamImg.value,
                date: this.refs.date.value,
                votes: this.props.votes
            })
        },
        render: function () {
            const submitText = (this.props.id ? 'Update' : 'Create');
            return (
                <div className='ui centered card dream'>
                    <div className='content'>
                        <div className='ui form'>
                            <div className='field'>
                                <label>Title *</label>
                                <input type='text' ref='title'
                                    defaultValue={this.props.title} />
                                </div>
                                <div className='field'>
                                    <label>Description *</label>
                                    <textarea type='text' ref='description'
                                        defaultValue={this.props.description} ></textarea>
                                    </div>
                                    <div className='field'>
                                        <label>Image URL</label>
                                        <input type='text' ref='dreamImg'
                                            defaultValue={this.props.dreamImg} />
                                        </div>
                                        <div className='field'>
                                            <label>Date</label>
                                            <input type='date' ref='date'
                                                defaultValue={this.props.date} />
                                            </div>
                                            <div className='ui two bottom attached buttons'>
                                                <button className='ui inverted blue button'
                                                    onClick={this.handleSubmit}
                                                    >
                                                        {submitText}
                                                    </button>
                                                    <button className='ui inverted red button'
                                                        onClick={this.props.onFormClose}
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                }
                            });

                            const ToggleableDreamForm = React.createClass({
                                getInitialState: function(){
                                    return {
                                        isOpen: false,
                                    };
                                },
                                handleFormOpen: function(){
                                    this.setState({ isOpen: true });
                                },
                                handleFormClose: function(){
                                    this.setState({ isOpen: false });
                                },
                                handleFormSubmit: function(dream){
                                    this.props.onFormSubmit(dream);
                                    this.setState({ isOpen: false });
                                },
                                render: function () {
                                    if (this.state.isOpen) {
                                        return (
                                            <DreamForm
                                                onFormSubmit={this.handleFormSubmit}
                                                onFormClose={this.handleFormClose}

                                            />
                                        );
                                    } else {
                                        return (
                                            <div data-inverted="" data-tooltip="Add a new dream" className='ui basic content center aligned segment'>
                                                <button
                                                    className='ui basic button icon'
                                                    onClick={this.handleFormOpen}

                                                    >
                                                        <i className='plus icon'></i> </button>
                                                    </div>
                                                ); }
                                            }
                                        })

                                        const Dream = React.createClass({
                                            handleTrashClick: function () {
                                                this.props.onTrashClick(this.props.id);
                                            },
                                            handleUpvote: function () {
                                                this.props.onUpvote(this.props.id)
                                            },
                                            handleDownvote: function () {
                                                this.props.onDownvote(this.props.id)
                                            },
                                            render: function () {
                                                return (
                                                    <div className='ui centered card dream'>
                                                        <div className='content'>
                                                            <div className="ui purple ribbon label">
                                                                {this.props.title}
                                                            </div>
                                                            <span
                                                                className='right floated edit icon'
                                                                onClick={this.props.onEditClick}
                                                                >
                                                                    <i className='edit icon'></i> </span>
                                                                    <span
                                                                        className='right floated trash icon'
                                                                        onClick={this.handleTrashClick}
                                                                        >
                                                                            <i className='trash icon'></i>
                                                                        </span>
                                                                        <br/>
                                                                        <br/>
                                                                        <img className="right floated small ui image" src={this.props.dreamImg}/>
                                                                        <div className="meta">
                                                                            {this.props.date}
                                                                        </div>
                                                                        <div className="description">
                                                                            {this.props.description}
                                                                        </div>
                                                                    </div>
                                                                    <div className="extra content">
                                                                        <div className="ui two buttons">
                                                                            <div
                                                                                className="ui icon green inverted button"
                                                                                onClick={this.handleUpvote}
                                                                                data-inverted="" data-tooltip="Upvote this dream"
                                                                                >
                                                                                    <i className="cloud upload icon"></i>
                                                                                    <br/>
                                                                                    Float
                                                                                </div>
                                                                                <div
                                                                                    className="ui icon red inverted button"
                                                                                    onClick={this.handleDownvote}
                                                                                    data-inverted="" data-tooltip="Downvote this dream"
                                                                                    >
                                                                                        <i className="cloud download icon"></i>
                                                                                        <br/>
                                                                                        Descend
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    );
                                                                },
                                                            });



                                                            ReactDOM.render(
                                                                <DreamsDashboard>
                                                                </DreamsDashboard>,
                                                                document.getElementById('content')
                                                            );
