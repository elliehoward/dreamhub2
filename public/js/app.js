const DreamsDashboard = React.createClass({
    render: function () {
        return (
            <div className='ui three column centered grid'>
                <div className='column'>
                    <EditableDreamList />
                    <ToggleableDreamForm
                        isOpen={false} />
                    </div>
                </div>
            )
        }
    });

    const EditableDreamList = React.createClass({
        render: function () {
            return (
                <div id='dreams'>
                    <EditableDream
                        title='Inside of a blackhole'
                        description='What happens in a blackhole? what happens when you go into a blackhole in dreamland? Try it in your next lucid dream and let me know!'
                        date='2/25/17'
                        private={false}
                        editFormOpen={false}
                        dreamImg='http://i.ytimg.com/vi/lt0WQ8JzLz4/maxresdefault.jpg'
                    />
                    <EditableDream
                        title='Spiders were everywhere'
                        description='I dreamed that my sister and I were trapped in my old house and it was filled with spiders. They would come in waves. We had to escape while the spiders were gone, and hide under tissues in my closet if the spiders came out. They would crawl over everything. I remember looking for my sister when the spiders left but I could not find her. I woke up before making it outdoors.'
                        date='1/12/17'
                        private={false}
                        editFormOpen={false}
                        dreamImg='http://s-media-cache-ak0.pinimg.com/originals/76/61/c7/7661c751a1c735e42c6943b644c847f4.jpg'
                    />
                </div>
            ); },
        });

        const EditableDream = React.createClass({
            render: function () {
                if(this.props.editFormOpen) {
                    return (
                        <DreamForm
                            title={this.props.title}
                            description={this.props.description}
                        />
                    );

                } else {
                    return (
                        <Dream
                            title={this.props.title}
                            description={this.props.description}
                            date={this.props.date}
                            private={this.props.true}
                            dreamImg={this.props.dreamImg}
                        />
                    );
                }
            }
        });

        const DreamForm = React.createClass({
            render: function () {
                const submitText = this.props.title ? 'Update' : 'Create';
                return (
                    <div className='ui centered card'>
                        <div className='content'>
                            <div className='ui form'>
                                <div className='field'>
                                    <label>Title</label>
                                    <input type='text' defaultValue={this.props.title} />
                                </div>
                                <div className='field'>
                                    <label>Description</label>
                                    <input type='text' defaultValue={this.props.description} />
                                </div>
                                <div className='ui two bottom attached buttons'>
                                    <button className='ui basic blue button'>
                                        {submitText}
                                    </button>
                                    <button className='ui basic red button'>
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
            render: function () {
                if (this.props.isOpen) {
                    return (
                        <DreamForm />
                    );
                } else {
                    return (
                        <div className='ui basic content center aligned segment'> <button className='ui basic button icon'>
                            <i className='plus icon'></i> </button>
                        </div>
                    ); }
                }
            })

            const Dream = React.createClass({
                render: function () {
                    return (
                        <div className='ui centered card'>
                             <div className='content'>
                                 <span className='right floated edit icon'>
                                     <i className='edit icon'></i> </span>
                                     <span className='right floated trash icon'> <i className='trash icon'></i>
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
                                <div className="ui icon green inverted button"><i className="cloud upload icon"></i></div>
                                <div className="ui icon red inverted button"><i className="cloud download icon"></i></div>
                            </div>
                        </div>
                    </div>
                )
                ; },
            });


            ReactDOM.render(
                <DreamsDashboard/>,
                document.getElementById('content')
            );
