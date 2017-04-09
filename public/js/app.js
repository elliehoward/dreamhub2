const DreamsDashboard = React.createClass({
    getInitialState: function(){
        return {
            dreams: [
                {
                    title: 'Inside of a blackhole',
                    id: uuid.v4(),
                    description: 'What happens in a blackhole? what happens when you go into a blackhole in dreamland? Try it in your next lucid dream and let me know!',
                    date: '2/25/17',
                    private: false,
                    editFormOpen: false,
                    dreamImg: 'http://i.ytimg.com/vi/lt0WQ8JzLz4/maxresdefault.jpg'
                }, {
                    title: 'Spiders were everywhere',
                    description: 'I dreamed that my sister and I were trapped in my old house and it was filled with spiders. They would come in waves. We had to escape while the spiders were gone, and hide under tissues in my closet if the spiders came out. They would crawl over everything. I remember looking for my sister when the spiders left but I could not find her. I woke up before making it outdoors.',
                    date: '1/12/17',
                    private: false,
                    editFormOpen: false,
                    dreamImg: 'http://s-media-cache-ak0.pinimg.com/originals/76/61/c7/7661c751a1c735e42c6943b644c847f4.jpg'
                }
            ]
        }
    },
    handleEditFormSubmit: function (attrs) {
        this.updateDream(attrs);
    },
    handleTrashClick: function (dreamId) {
        this.deleteDream(dreamId)
    },
    handleCreateFormSubmit: function(dream){
        this.createDream(dream);
    },
    createDream: function(dream){
        const d = helpers.newDream(dream);
        this.setState({
            dreams: this.state.dreams.concat(d),
        });
    },
    updateDream: function(attrs){
        this.setState({
            dreams: this.state.dreams.map((dream) => {
                if (dream.id === attrs.id) {
                    return Object.assign({}, dream, {
                        title: attrs.title,
                        description: attrs.description,
                        id: uuid.v4(),
                        dreamImg: attrs.dreamImg,
                        date: attrs.date,
                    });
                } else {
                    return dream;
                }
            }),
        });
    },
    deleteDream: function (dreamId) {
        this.setState({
            dreams: this.state.dreams.filter(d => d.id !== dreamId),
        });
    },
    render: function () {
        return (
            <div className='ui three column centered grid'>
                <div className='column'>
                    <EditableDreamList
                        dreams={this.state.dreams}
                        onFormSubmit={this.handleEditFormSubmit}
                        onTrashClick={this.handleTrashClick}
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
        const dreams = this.props.dreams.map((dream) => (
            <EditableDream
                title={dream.title}
                id={dream.id}
                key={dream.id}
                description={dream.description}
                date={dream.date}
                private={dream.private}
                dreamImg={dream.dreamImg}
                onFormSubmit={this.props.onFormSubmit}
                onTrashClick={this.props.onTrashClick}
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
                        onEditClick={this.handleEditClick}
                        onTrashClick={this.props.onTrashClick}
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
            date: this.refs.date.value
        })
    },
    render: function () {
        const submitText = this.props.id ? 'Update' : 'Create';
        return (
            <div className='ui centered card'>
                <div className='content'>
                    <div className='ui form'>
                        <div className='field'>
                            <label>Title *</label>
                            <input type='text' ref='title'
                                defaultValue={this.props.title} />
                            </div>
                            <div className='field'>
                                <label>Description *</label>
                                <input type='text' ref='description'
                                    defaultValue={this.props.description} />
                                </div>
                                <div className='field'>
                                    <label>Image URL</label>
                                    <input type='text' ref='dreamImg'
                                        defaultValue={this.props.dreamImg} />
                                    </div>
                                    <div className='field'>
                                        <label>Date</label>
                                        <input type='text' ref='date'
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
                <div className='ui basic content center aligned segment'>
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
    render: function () {
        return (
            <div className='ui centered card'>
                <div className='content'>
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
                        <img className="right floated small ui image" src={this.props.dreamImg}/>
                        <div className="header">
                            {this.props.title}
                        </div>
                        <div className="meta">
                            {this.props.date}
                        </div>
                        <div className="description">
                            {this.props.description}
                        </div>
                    </div>
                    <div className="extra content">
                        <div className="ui two buttons">
                            <div className="ui icon green inverted button"><i className="cloud upload icon"></i>  Float</div>
                            <div className="ui icon red inverted button"><i className="cloud download icon"></i>  Descend</div>
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
